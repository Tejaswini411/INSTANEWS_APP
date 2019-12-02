$(document).ready(function() {

  $('.loader').hide();

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
    results.map((result) => {
      if (result.multimedia.length > 0) {
        const articleStructure = `<div class="article-container"><img src="${result.multimedia[4].url}" class="article-image" alt="" /><p class="article-desc">${result.abstract}</p></div>`;
        $('.top-stories').append(articleStructure);
      }
      $('.loader').hide();
    });
  };

  $('#myList').on('change', () => {
    $('.top-stories').html('');
    $('.loader').show();

    if($("option:selected").val() === "") {
      
      return;
    }

    const articleType = $("option:selected").text().toLowerCase();
    fetchArticles(articleType);
  });
  
});







