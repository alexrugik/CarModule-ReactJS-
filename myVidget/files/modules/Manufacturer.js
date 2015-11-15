var Manufacturer = React.createClass({

    loadManufacturer: function () {
        this.handleChange();
        if (document.getElementById("selectYears").getAttribute("value") == "true") {
            $.ajax({
                url: this.props.url,
                dataType: 'json',
                cache: false,
                data: {year: this.getSelectedYear()},
                success: function (data) {
                    this.setState({manufacturer: data})
                }.bind(this),
                error: function (xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            });
            document.getElementById("selectYears").setAttribute("value", "false")
        }
    },

    getDefaultProps: function () {
        return {
            key: false
        }
    },

    getInitialState: function () {
        return {
            manufacturer: [],
            key: false
        }
    },

    componentDidMount: function () {
        this.loadManufacturer();
        setInterval(this.loadManufacturer, this.props.pollInterval);
    },

    getSelectedYear: function () {
        return $(".years option:selected").val();
    },

    handleChange: function () {
        var years = document.getElementById("selectYears");
        years.addEventListener("change", function () {
            years.setAttribute("value", "true");
            document.getElementById("selectManufacturer").removeAttribute("disabled");
            $('#selectManufacturer').prop('selectedIndex', 0);
        })
    },

    render: function () {
        return (
            <select className="manufacturer" id="selectManufacturer" disabled="disabled">
                <option>Выберите бренд</option>
                {this.state.manufacturer.map(function (item) {
                    return <Component key={item.id} data={item}/>
                })}
            </select>
        )
    }
});

var Component = React.createClass({
    render: function () {
        return (
            <option id={this.props.data.id}
                    value={this.props.data.slug + "!" + this.props.data.uk_name + "!" + this.props.data.ru_name}>
                {this.props.data.ru_name}</option>
        )
    }
})


ReactDOM.render(
    <Manufacturer url="https://www.etachki.com/api/ext/bb113842-b4ec-4102-9594-92f8b3ace91c/getManufacturer"
                  pollInterval={100}/>,
    document.getElementById("manufacturer")
);

