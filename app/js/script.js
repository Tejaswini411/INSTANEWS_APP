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
    let i = 0;
    stories = [];
    results.map((result) => {
        if (result.multimedia.length > 0 && i < 12) {
          const articleStructure = `
          <div class="article-container">
            <a href="${result.url}" title="${result.title}">
              <img src="${result.multimedia[4].url}" class="article-image" alt="" />
              <p class="article-desc">${result.abstract}</p>
            </a>
          </div>`;
          stories.push(articleStructure);
          $('.top-stories').append(stories[i]);
          i++;

        }

      $('.loader').hide();
    });
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







