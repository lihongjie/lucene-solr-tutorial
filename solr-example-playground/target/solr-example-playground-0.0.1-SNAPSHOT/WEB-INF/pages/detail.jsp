<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
    <link rel="icon" type="image/x-icon" href="${pageContext.request.contextPath}/resources/img/favicon.png">
</head>
<body>

    <table>
        <tr>
            <td>id</td>
            <td><c:out value="${product.id}"/></td>
        </tr>
        <tr>
            <td>name</td>
            <td>${product.name}</td>
        </tr>
        <tr>
            <td>生产厂商</td>
            <td>${product.manu}</td>
        </tr>
        <tr>
            <td>生产厂商id</td>
            <td>${product.manuId}</td>
        </tr>
        <tr>
            <td>分类</td>
            <td>${product.categories}</td>
        </tr>
        <tr>
            <td>功能</td>
            <td>${product.features}</td>
        </tr>
        <tr>
            <td>价格</td>
            <td>${product.price}</td>
        </tr>
        <tr>
            <td>知名度</td>
            <td>${product.popularity}</td>
        </tr>
        <tr>
            <td>是否有库存</td>
            <td>${product.inStock}</td>
        </tr>
        <tr>
            <td>生产日期</td>
            <td><fmt:formatDate value="${product.manuFactureDate}" pattern="yyyy-MM-dd hh:mm:ss"/></td>
        </tr>

    </table>
</body>
</html>
