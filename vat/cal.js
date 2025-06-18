function calculate() {
    const p = $("#basePrice").val();
    console.log("Base Price",p)
    const vatRate = 7;
    const vat = (p * vatRate) / 100;
    console.log("VAT", vat);
    const total = parseFloat(p) + vat;
    console.log("Total Price", total);
    
    $("#result").html(`
        <p>Base Price: ${p}</p>
        <p>VAT (7%): ${vat.toFixed(2)}</p>
        <p>Total Price: ${total.toFixed(2)}</p>
    `);

}

const calculateWithVat = () => {
    const pv = parseFloat($("#priceWithVat").val())
    const vatRate = 7;
    const basePrice = pv / (1 + vatRate / 100);
    const vatAmount = pv - basePrice;
    const vatPercent = (vatAmount / basePrice) * 100;
    console.log("Base Price (with VAT):", basePrice.toFixed(2));
    console.log("VAT Amount:", vatAmount.toFixed(2));
    console.log("VAT Percent:", vatPercent.toFixed(2));
    $("#resultWithVat").html(`
        <p>Price with VAT: ${pv}</p>
        <p>Base Price: ${basePrice.toFixed(2)}</p>
        <p>VAT (7%): ${vatAmount.toFixed(2)}</p>
    `);
}