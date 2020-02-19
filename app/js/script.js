$(document).ready(function() {

  $('.loader').hide();

  $('select').selectric();

  const fetchArticles = (articleType) => {
    $.ajax({
        url: `https://api.nytimes.com/svc/topstories/v2/${articleType}.json?api-key=uVsGON6UfLMCDT3ebpRGQZsw0MSqmPCU`,
        type: 'GET',
        success: function(res) {
            var desc = res.results;
            populateArticles(res.results);
        }
    });
  };

  const populateArticles = (results) => {
    if (results.length >= 12) {
    // results.map((result) => {
      for(i=0;i<=11;i++){
      if (results[i].multimedia.length > 0) {
        const articleStructure = `<div class="article-container"><a href="${results[i].url}" title="${results[i].title}"><img src="${results[i].multimedia[0].url}" class="article-image" alt="" /><p class="article-desc">${results[i].abstract}</p></a></div>`;

        $('.top-stories').append(articleStructure);
      }
      $('.loader').hide();
    }
  }
    // });
  };

  $('.myList').on('change', () => {
    $('.top-stories').html('');
    $('.loader').show();

    if($("option:selected").val() === "") {
      fetchArticles("home"); 
    }

    const articleType = $("option:selected").text().toLowerCase();
    fetchArticles(articleType);
  });
  
  fetchArticles("home");

});







