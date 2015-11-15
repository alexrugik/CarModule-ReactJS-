var Series = React.createClass({

    loadSeries: function () {
        this.handleChange();
        if (document.getElementById("selectModel").getAttribute("value") == "true") {
            $.ajax({
                url: this.props.url,
                dataType: 'json',
                cache: false,
                data: {
                    year: this.getSelectedYear(),
                    model: this.getSelectedModel(),
                },
                success: function (data) {
                    this.setState({series: data})
                }.bind(this),
                error: function (xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            })
            document.getElementById("selectModel").setAttribute("value", "false");
        }
    },

    getInitialState: function () {
        return {series: []}
    },

    componentDidMount: function () {
        this.loadSeries();
        setInterval(this.loadSeries, this.props.pollInterval)
    },

    getSelectedModel: function () {
        return $(".model option:selected").attr('id');
    },

    getSelectedYear: function () {
        return $(".years option:selected").val();
    },

    handleChange: function () {
        var model = document.getElementById("selectModel");
        model.addEventListener("change", function () {
            model.setAttribute("value", "true");
            document.getElementById("selectSeries").removeAttribute("disabled")
        });
        var years = document.getElementById("selectYears");
        years.addEventListener("change", function () {
            document.getElementById("selectSeries").setAttribute("disabled", "disabled");
            $('#selectSeries').prop('selectedIndex', 0);
        });
        var manufacturer = document.getElementById("selectManufacturer");
        manufacturer.addEventListener("change", function () {
            document.getElementById("selectSeries").setAttribute("disabled", "disabled");
            $('#selectSeries').prop('selectedIndex', 0);
        });
    },

    render: function () {
        return (
            <select className="series" id="selectSeries" disabled="disabled">
                <option>Выберите серию</option>
                {this.state.series.map(function (item) {
                    return <Component key={item.id} data={item}/>
                })}
            </select>
        );
    }
})

var Component = React.createClass({
    render: function () {
        return (
            <option id={this.props.data.id} value={this.props.data.ru_name + "!" + this.props.data.uk_name}>
                {this.props.data.ru_name}</option>
        )
    }
})


ReactDOM.render(
    <Series url="https://www.etachki.com/api/ext/2a11fcea-0e57-469a-b1e9-93cea09628f9/getSeries" pollInterval={100}/>,
    document.getElementById("series")
);



