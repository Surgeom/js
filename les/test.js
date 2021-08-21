var text = `Lorem ipsum "dolor" sit aren't amet consectetur 'adipisicing' elit. Debitis ducimus "nostrum" accusamus 'esse' cum id vero fuga, quibusdam quam quos, eligendi expedita ipsam, quaerat similique quasi ut asperiores deleniti quisquam.`
var reg = /\B'|'\B/g
console.log(text.replace(reg, '"'))
