// stateless functional component


class IndecisionApp extends React.Component {
    constructor(props) {
        super(props);
        this.handleRemoveAll = this.handleRemoveAll.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.handleDeleteOption = this.handleDeleteOption.bind(this);
        this.state = {
            options: ['Thing one', 'Thing two', 'Thing three', 'Thing four']
        }
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
    handleRemoveAll() {
        this.setState(() => {
            return {
                options: []
            };
        });
    };
    handleDeleteOption(optionToRemove) {
        this.setState((preState) => {
            return {
                options: preState.options.filter((option) => {
                    return option !== optionToRemove;
                })
            }
        })

    };
    handleAddOption(option) {
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
                <Action hasOptions={this.state.options.length > 1 ? true : false} />
                <Options options={this.state.options} handleRemoveAll={this.handleRemoveAll} handleDeleteOption={this.handleDeleteOption} />
                <AddOption handleAddOption={this.handleAddOption} />
            </div>
        );
    };

}

class Header extends React.Component {
    render() {
        // console.log(this.props);
        return (
            <div>
                <h1>{this.props.title}</h1>
                <h2>{this.props.subtitle}</h2>
            </div>
        )
    }
}


class Action extends React.Component {
    handlePick() {
        alert('handlePick');
    };
    render() {
        return (
            <div>
                <button onClick={this.handlePick}
                    disabled={!this.props.hasOptions}
                >What should I do?</button>
            </div>
        );
    }
}


class Options extends React.Component {
    render() {
        return (

            <div>
                <button onClick={this.props.handleRemoveAll}>Remove All</button>
                {
                    this.props.options.map((option) =>
                        <Option key={option} optionText={option} handleDeleteOption={this.props.handleDeleteOption} />
                    )
                }

            </div>
        );
    }
}

class Option extends React.Component {
    render() {
        return (
            <div>
                {this.props.optionText}
                <button onClick={() => {
                    this.props.handleDeleteOption(this.props.optionText);
                }}>Remove</button>
            </div>
        )
    }
}

// TODO: AddOption -> AddOption component here
class AddOption extends React.Component {
    constructor(props) {
        super(props);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.state = {
            error: undefined
        }
    }
    handleAddOption(e) {
        e.preventDefault();

        const option = e.target.elements.option.value.trim();
        const error = this.props.handleAddOption(option);

        this.setState(() => {
            return {
                error: error,
            }
        })

    }

    render() {
        return (
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.handleAddOption}>
                    <input type="text" name="option" />
                    <button>Add Option</button>
                </form>
            </div >
        );
    }
}


ReactDOM.render(<IndecisionApp />, document.getElementById('app'))