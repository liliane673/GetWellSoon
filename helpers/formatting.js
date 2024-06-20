function formatCurrency(value){
    const currencyRupiah= new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
    });

    return currencyRupiah.format(value);
}

function formatDate(value){
    // const dayName= value.toLocaleDateString(locale, { weekday: 'long' }); 
    const dayName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][value.getDay()]
     
    const dateFormat=  value.toISOString().split('T')[0];

    return `${dayName}, ${dateFormat}`
}

module.exports={formatCurrency,formatDate};