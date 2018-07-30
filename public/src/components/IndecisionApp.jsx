import React from 'react';
import AddOption from './AddOption';
import Header from './Header';
import Options from './Options';
import Action from './Action'
import OptionModal from "./OptionModal";

export default class IndecisionApp extends React.Component {
    state = {
        options: ['Thing one', 'Thing two', 'Thing three', 'Thing four'],
        selectedOption: undefined
    };
    closeModal = () => {
        this.setState(() => ({
            selectedOption: undefined
        }
        ));
    };
    componentDidMount() {
        const json = localStorage.getItem('options');
        const options = JSON.parse(json);
        if (json) {
            this.setState(() => ({
                options: options
            }));
        }
    };
    componentDidUpdate(prevProps, prevState) {
        if (prevState.options.length !== this.state.options.length) {
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options', json);
        }
    };
    handlePick = () => {
        const randomNum = Math.floor(Math.random() * this.state.options.length);
        const option = this.state.options[randomNum];
        console.log(option);
        this.setState(() => ({
            selectedOption: option
        }
        ));
    };


    handleRemoveAll = () => {
        this.setState(() => {
            return {
                options: []
            };
        });
    };
    handleDeleteOption = (optionToRemove) => {
        this.setState((preState) => {
            return {
                options: preState.options.filter((option) => {
                    return option !== optionToRemove;
                })
            }
        })

    };
    handleAddOption = (option) => {
        if (!option) {
            return 'Enter valid value to add item';
        } else if (this.state.options.indexOf(option) > -1) {
            return 'This option already exists';
        }

        this.setState(((preState) => {
            return {
                options: preState.options.concat(option)
            }
        }))
    }

    render() {
        const title = 'Indecision';
        const subtitle = 'Put your life in the hands of a computer.'
        // const options = 
        return (
            <div>
                <Header title={title} subtitle={subtitle} />
                <div className="container">
                    <Action hasOptions={this.state.options.length > 1 ? true : false} handlePick={this.handlePick} />
                    <div className="widget">
                        <Options options={this.state.options} handleRemoveAll={this.handleRemoveAll} handleDeleteOption={this.handleDeleteOption} />
                        <AddOption handleAddOption={this.handleAddOption} />
                    </div>
                    <OptionModal selectedOption={this.state.selectedOption} closeModal={this.closeModal} />
                </div>
            </div>
        );
    };

}