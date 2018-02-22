<div class="row search-box">
    <div class="col-xs-8">
        <div class="text-center">
            <h1>
                Welcome to Solr tutorial
            </h1>
        </div>
        <form action="${pageContext.request.contextPath}/search?" method="get">
            <div class="">
                <div class="table-item table-item-primary">
                    <input name="query" class="form-control input-block query" value="${query}"/>
                </div>
                <div class="table-item">
                    <button type="submit" class="btn btn-default search-btn">Search</button>
                </div>
            </div>
        </form>
    </div>
</div>
