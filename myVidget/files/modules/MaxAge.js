var MaxAge = React.createClass({

    loadMaxAge: function () {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({maxAge: data})
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
        this.setState({key: false});
    },

    getInitialState: function () {
        return {
            maxAge: [],
            key: true
        };
    },

    componentWillMount: function () {
        this.loadMaxAge()
    },

    getYears: function (value) {
        var years = [];
        var current_year = new Date().getFullYear();
        var first_year = current_year - value;

        for (var i = first_year; i != (current_year + 1); i++) {
            years.push(i);
        }
        years.reverse();
        return years;
    },

    render: function () {
        return (
            <select className="years" id="selectYears">
                <option>Выберите год</option>
                {this.getYears(this.state.maxAge).map(function (item) {
                    return <Component key={item} data={item}/>
                })}
            </select>
        )
    }
});

var Component = React.createClass({
    render: function () {
        return (
            <option id={this.props.data}>{this.props.data}</option>
        )
    }
});

ReactDOM.render(
    <MaxAge url="https://www.etachki.com/api/ext/bb113842-b4ec-4102-9594-92f8b3ace91c/getMaxAge" pollInterval={100}/>,
    document.getElementById("years")
);