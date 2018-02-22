
function enableSearch() {
    $('.search-box .search-btn').on("click", function () {

        search();
        // facet
        var query = $(".search-box .query").val();
        var facetRequest = $.ajax({
            url: "facet",
            method: "GET",
            data: {
                query: query
            }
        });

        facetRequest.done(function(msg) {
            $(".content .one-fourth").html(msg);
        });

        facetRequest.fail(function(jqXHR, textStatus) {
            alert("Failed to load facet.");
        });
    });
}
function search() {
    debugger;
    var query = $(".search-box .query").val();
    var cat = $(".filter-list .filter-item.selected").data("name");
    var request = $.ajax({
        url: "search",
        method: "GET",
        data: {
            query : query,
            cat : cat
        }
    });
    request.done(function (msg) {
        $(".content .search-results").html(msg);
    });

    request.fail(function (jqXHR, textStatus) {
        alert("Failed")
    });
}

function filterItem() {

    $('.filter-item').on('click', function() {
        debugger;
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');

        } else {
            $(this).addClass('selected');
        }
        search();
    })
}

$(document).ready(function () {

    $('.eidt-button').click(function () {

        debugger;
        $.ajax({
            url: "edit/6",
            type: "GET",
            success: function (data) {
                console.log("successful");
            },
            error: function (xhr) {
                debugger;
                console.log("failed");
            }

        })
    });
    enableSearch();

});

