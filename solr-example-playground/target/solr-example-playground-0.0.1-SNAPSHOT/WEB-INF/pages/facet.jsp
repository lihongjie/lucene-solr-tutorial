<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<div class="border rounded-1 p-3 mb-3">
    <h2 class="d-inline-block f5 mb-2">Categories</h2>
    <ul class="filter-list small">
        <c:forEach var="facet" items="${facets}">
            <li>
                <span class="bar" style="width: 21%;"></span>
                <a href="javascript:void(0);" class="filter-item" onclick="filterItem()" data-name="${facet.name}">
                    <span class="count">${facet.count}</span>
                        ${facet.name}
                </a>
            </li>
        </c:forEach>
    </ul>
</div>

