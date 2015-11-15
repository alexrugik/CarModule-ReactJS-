var Button = React.createClass({

    render: function () {
        return (
            <button type="button" id="button" disabled="disabled">Оценить стоимость</button>
        )
    }
})

ReactDOM.render(
    <Button/>,
    document.getElementById("forButton")
);
