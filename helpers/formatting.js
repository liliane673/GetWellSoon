function formatCurrency(value){
    const currencyRupiah= new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
    });

    return currencyRupiah.format(value);
}

module.exports={formatCurrency};