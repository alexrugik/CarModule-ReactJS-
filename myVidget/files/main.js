var Form = React.createClass({

    render: function () {
        return (
            <div className="formContainer">
                <form id="form" method="get" action="index2.html">
                    <p3>Регион:</p3>
                    <div id="region"></div>
                    <p3>Год:</p3>
                    <div id="years"></div>
                    <p3>Производитель:</p3>
                    <div id="manufacturer"></div>
                    <p3>Модель:</p3>
                    <div id="model"></div>
                    <p3>Серия:</p3>
                    <div id="series"></div>
                    <p3>Модификация:</p3>
                    <div id="body"></div>
                    <p3>Пробег(км):</p3>
                    <div id="odometer"></div>
                </form>
                <br/>

                <div id="forButton"></div>
                <br/>
                <br/>

                <div id="price"></div>
            </div>
        )
    }

});

ReactDOM.render(
    <Form/>,
    document.getElementById("content")
);

