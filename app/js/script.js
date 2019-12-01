$(function () {

// const getArticle = ( => ) { 

// }


$.ajax({
    url: "https://api.nytimes.com/svc/topstories/v2/science.json?api-key=uVsGON6UfLMCDT3ebpRGQZsw0MSqmPCU ",
    type: 'GET',
    success: function(res) {
        const desc = res.results;
        console.log(desc);

        // let desc = res.results[2].abstract;
        // console.log(desc);

        // $( ".abstract" ).append( `<p>${desc}</p>`);
        
    }
});

});












//secret
////uIL9me8aCA3Fdr0A


//key
///uVsGON6UfLMCDT3ebpRGQZsw0MSqmPCU

//app id
//d3398400-cce5-45b2-814c-affe8998ce1f