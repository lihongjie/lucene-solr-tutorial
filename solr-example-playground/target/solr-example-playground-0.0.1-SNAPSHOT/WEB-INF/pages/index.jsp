<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1"/>
    <title>Home page</title>
    <link rel="icon" type="image/x-icon" href="${pageContext.request.contextPath}/resources/img/favicon.png">
<%--    <link type="text/css" rel="stylesheet" href="${pageContext.request.contextPath}/resources/global.css"/>--%>
    <link type="text/css" rel="stylesheet" href="${pageContext.request.contextPath}/resources/framework-reset.css"/>
    <link type="text/css" rel="stylesheet" href="${pageContext.request.contextPath}/resources/github-css.css"/>
    <link type="text/css" rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/autocompeter.min.css"/>
<%--    <link type="text/css" rel="stylesheet" href="${pageContext.request.contextPath}/resources/bootstrap/bootstrap.css"/>
    <link type="text/css" rel="stylesheet"
          href="${pageContext.request.contextPath}/resources/bootstrap/bootstrap-theme.css"/>--%>
<%--    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/jquery-2.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/bootstrap/bootstrap.js"></script>--%>
    <%--<script type="text/javascript" src="${pageContext.request.contextPath}/resources/util.js"></script>--%>

</head>
<body>

<div role="main">

<div class="container simple-search-page one-half">
    <div class="">
        <div class="row search-box">
            <div class="col-xs-8">
                <div class="text-center">
                    <h1>
                        Welcome to Solr tutorial
                    </h1>
                </div>
                <form action="${pageContext.request.contextPath}/search?" method="get">
                    <div style="margin:0;padding:0;display:inline">
                        <input name="utf8" type="hidden" value="✓"/>
                    </div>
                    <div class="TableObject search-form-fluid">
                        <div class="TableObject-item TableObject-item--primary">
                            <input name="query" class="form-control input-block query" value="${query}"/>
                        </div>
                        <div class="TableObject-item">
                            <button type="submit" class="btn btn-default search-btn">Search</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div class="content clearfix gutter-condensed">
            <div class="column three-fourths product-search-results pr-6">
                <div class="d-flex flex-justify-between border-bottom pb-3">
                    <h3>${hitCount} products results</h3>
                    <div class="select-menu js-menu-container">

                    </div>
                </div>
                <ul class="product-list js-product-list">
                    <c:forEach var="product" items="${products}">
                        <div class="product-list-item d-flex flex-justify-start py-4 public source">
                            <div class="col-10 pr-3">
                                <h3>
                                    <a href="search/${product.id}" class="v-align-middle">
                                        ${product.name}
                                    </a>
                                </h3>
                                <p class="col-9 d-inline-block text-gray mb-2 pr-4">
                                    A library to simplify iOS animations in Swift.
                                </p>
                                <p class="f6 text-gray mb-0 mt-2">
                                    Updated <relative-time datetime="2017-06-19T15:37:18Z" title="2017年6月19日 GMT+8 下午11:37">3 days ago</relative-time>
                                </p>
                            </div>
                            <div class="d-table-cell col-2 text-gray pt-2">
                                <span class="repo-language-color ml-0" style="background-color:#b07219;"></span>
                                ${product.inStock}
                            </div>
                            <div class="col-2 text-right pt-1 pr-3 pt-2">
                                <a class="muted-link" href="MengTo/Spring/stargazers">
                                    <svg aria-label="star" class="octicon octicon-star" height="16" role="img" version="1.1" viewBox="0 0 14 16" width="14">
                                        <path fill-rule="evenodd" d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74z"></path>
                                    </svg>
                                    ${product.price}
                                </a>
                            </div>
                        </div>
                    </c:forEach>
                </ul>
                <div class="paginate-container">

                </div>
            </div>
            <div class="column one-fourth">
                <div class="border rounded-1 p-3 mb-3">
                    <h2 class="d-inline-block f5 mb-2">Categories</h2>
                    <ul class="filter-list small">
                        <c:forEach var="facet" items="${facets}">
                        <li>
                            <span class="bar" style="width: 21%;"></span>
                            <c:choose>
                                <c:when test="${facet.selected}">
                                    <a href="${pageContext.request.contextPath}/search?query=${query}"
                                       class="filter-item selected">
                                        <span class="count">${facet.count}</span>
                                            ${facet.name}
                                    </a>
                                </c:when>
                                <c:otherwise>
                                    <a href="${pageContext.request.contextPath}/search?query=${query}&cat=${facet.name}"
                                       class="filter-item">
                                        <span class="count">${facet.count}</span>
                                            ${facet.name}
                                    </a>
                                </c:otherwise>
                          </c:choose>
                        </li>
                        </c:forEach>
                    </ul>
                </div>
            </div>
        </div>
    </div>


</div>
</div>

<%--页底--%>
<div class="container site-footer-container">
    <div class="site-footer " role="contentinfo">
        <ul class="site-footer-links float-right">
            <li><a href="https://github.com/contact" data-ga-click="Footer, go to contact, text:contact">Contact GitHub</a></li>
            <li><a href="https://developer.github.com" data-ga-click="Footer, go to api, text:api">API</a></li>
            <li><a href="https://training.github.com" data-ga-click="Footer, go to training, text:training">Training</a></li>
            <li><a href="https://shop.github.com" data-ga-click="Footer, go to shop, text:shop">Shop</a></li>
            <li><a href="https://github.com/blog" data-ga-click="Footer, go to blog, text:blog">Blog</a></li>
            <li><a href="https://github.com/about" data-ga-click="Footer, go to about, text:about">About</a></li>
        </ul>

        <a href="https://github.com" aria-label="Homepage" class="site-footer-mark" title="GitHub">
            <svg aria-hidden="true" class="octicon octicon-mark-github" height="24" version="1.1" viewBox="0 0 16 16" width="24"><path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path></svg>
        </a>
        <ul class="site-footer-links">
            <li>© 2017 <span title="0.35032s from github-fe153-cp1-prd.iad.github.net">GitHub</span>, Inc.</li>
            <li><a href="https://github.com/site/terms" data-ga-click="Footer, go to terms, text:terms">Terms</a></li>
            <li><a href="https://github.com/site/privacy" data-ga-click="Footer, go to privacy, text:privacy">Privacy</a></li>
            <li><a href="https://github.com/security" data-ga-click="Footer, go to security, text:security">Security</a></li>
            <li><a href="https://status.github.com/" data-ga-click="Footer, go to status, text:status">Status</a></li>
            <li><a href="https://help.github.com" data-ga-click="Footer, go to help, text:help">Help</a></li>
        </ul>
    </div>
</div>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/autocompeter.min.js"></script>
               <script>
                    // The url option overide here is optional, just done to make local development
                    // easier.
                    Autocompeter(
                        document.querySelector('input[name="q"]'), {
                            url: location.protocol + '//' + location.host + '/solr-tutorial/suggest'
                        }
                    );
                </script>
</body>
</html>