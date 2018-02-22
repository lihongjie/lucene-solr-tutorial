<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<div class="d-flex flex-justify-between border-bottom pb-3">
    <h3>${hitCount} products results</h3>
    <div class="select-menu js-menu-container">

    </div>
</div>
<ul class="product-list js-product-list">
    <c:forEach var="product" items="${products}">
        <div class="product-list-item">
            <div class="col-8 pr-3">
                <h3>${product.name}</h3>
                <p>${product.features}</p>
            </div>
        </div>
    </c:forEach>
</ul>
<div class="paginate-container">

</div>

