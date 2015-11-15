var Model = React.createClass({

    loadModel: function () {
        this.handleChange();
        if (document.getElementById("selectManufacturer").getAttribute("value") == "true") {
            $.ajax({
                url: this.props.url,
                dataType: 'json',
                cache: false,
                data: {
                    year: this.getSelectedYear(),
                    manufacturer: this.getSelectedManufacturerId(),
                },
                success: function (data) {
                    this.setState({models: data})
                }.bind(this),
                error: function (xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            })
            document.getElementById("selectManufacturer").setAttribute("value", "false");
        }
    },

    getInitialState: function () {
        return {models: []}
    },

    componentDidMount: function () {
        this.loadModel();
        setInterval(this.loadModel, this.props.pollInterval)
    },

    getSelectedManufacturerId: function () {
        return $(".manufacturer option:selected").attr('id');
    },

    getSelectedYear: function () {
        return $(".years option:selected").val();
    },

    handleChange: function () {
        var manufacturer = document.getElementById("selectManufacturer");
        manufacturer.addEventListener("change", function () {
            manufacturer.setAttribute("value", "true");
            document.getElementById("selectModel").removeAttribute("disabled")
        })
        var years = document.getElementById("selectYears");
        years.addEventListener("change", function () {
            document.getElementById("selectModel").setAttribute("disabled", "disabled");
            $('#selectModel').prop('selectedIndex', 0);
        })
    },

    render: function () {
        return (
            <select className="model" id="selectModel" disabled="disabled">
                <option>Выберите модель</option>
                {this.state.models.map(function (item) {
                    return <Component key={item.id} data={item}/>
                })}
            </select>
        );
    }
});

var Component = React.createClass({
    render: function () {
        return <option id={this.props.data.id} value={this.props.data.ru_name + "!" + this.props.data.uk_name}>
            {this.props.data.ru_name}</option>
    }
});

ReactDOM.render(
    <Model url="https://www.etachki.com/api/ext/2a11fcea-0e57-469a-b1e9-93cea09628f9/getModels" pollInterval={100}/>,
    document.getElementById("model")
);


