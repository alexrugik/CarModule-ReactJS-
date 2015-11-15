var Odometer = React.createClass({

    handleChange: function () {
        var body = document.getElementById("selectBody");
        body.addEventListener("change", function () {
            document.getElementById("selectOdometer").removeAttribute("disabled")
        });
        var years = document.getElementById("selectYears");
        years.addEventListener("change", function () {
            document.getElementById("selectOdometer").setAttribute("disabled", "disabled");
            $('#selectOdometer').prop('selectedIndex', 0);
        });
        var manufacturer = document.getElementById("selectManufacturer");
        manufacturer.addEventListener("change", function () {
            document.getElementById("selectOdometer").setAttribute("disabled", "disabled");
            $('#selectOdometer').prop('selectedIndex', 0);
        });
        var series = document.getElementById("selectSeries");
        series.addEventListener("change", function () {
            document.getElementById("selectOdometer").setAttribute("disabled", "disabled");
            $('#selectOdometer').prop('selectedIndex', 0);
        });
        var model = document.getElementById("selectModel");
        model.addEventListener("change", function () {
            document.getElementById("selectOdometer").setAttribute("disabled", "disabled");
            $('#selectOdometer').prop('selectedIndex', 0);
        });
        var body = document.getElementById("selectBody");
        body.addEventListener("change", function () {
            $('#selectOdometer').prop('selectedIndex', 0);
        });
    },

    render: function () {
        this.handleChange();
        return (

            <select className="odometer" id="selectOdometer" disabled="disabled">
                <option className="odometer">Выберите пробег</option>
                <option className="odometer" value="5000">5000</option>
                <option className="odometer" value="10000">10000</option>
                <option className="odometer" value="15000">15000</option>
                <option className="odometer" value="20000">20000</option>
            </select>
        )
    }
});

ReactDOM.render(
    <Odometer/>,
    document.getElementById("odometer")
);