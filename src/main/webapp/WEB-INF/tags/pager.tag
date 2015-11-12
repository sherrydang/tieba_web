<%@ tag language="java" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ attribute name="curIndex" type="java.lang.Long" required="true" %>
<%@ attribute name="pagerRange" type="java.lang.Long" required="true" %>
<%@ attribute name="totalPage" type="java.lang.Long" required="true" %>
<%@ attribute name="url" type="java.lang.String" required="false" %>
<link rel="stylesheet" href="../../OSMweb/css/content.css">
<!--分页样式-->
<style type="text/css">.pager {
    margin-top: 10px;
    float: right;
    font: 12px Arial, Helvetica, sans-serif;
}

.pager a {
    padding: 1px 6px;
    border-color: green;
    border: solid 1px #ddd;
    background: #fff;
    text-decoration: none;
    margin-right: 2px;
    line-height: 30px;
    vertical-align: middle;
}

.pager .active a {
    border: none;
}

.pager a:visited {
    padding: 1px 6px;
    border: solid 1px #ddd;
    text-decoration: none;
}

.pager a:hover {
    color: #fff;
    background: #82B545;
    border-color: #ffa501;
    text-decoration: none;
}

.pager .input_li {
    padding: 1px 6px;
}

a.currentIndex {
    background: #82B545;
}
</style>


<%
    long begin = Math.max(1, curIndex - pagerRange / 2);
    long end = Math.min(begin + (pagerRange - 1), totalPage);
    request.setAttribute("p_begin", begin);
    request.setAttribute("p_end", end);
%>
<table class="pager">
    <tr>
        <% if (curIndex != 1) {%>
        <td>
            <%if (url == null) {%>
            <a href="search?type=1&page=1">首页</a>
            <%} else {%>
            <a href="<%=url%>?page=1">首页</a>
            <%}%>
        </td>
        <td>
            <%if (url == null) {%>
            <a href="search?type=1&page=<%=curIndex-1%>">上一页</a>
            <%} else {%>
            <a href="<%=url%>?page=<%=curIndex-1%>">上一页</a>
            <%}%>
        </td>
        <%} else {%>
        <td class="disabled"><a href="#">首页</a></td>
        <td class="disabled"><a href="#">上一页</a></td>
        <%}%>

        <c:forEach var="i" begin="${p_begin}" end="${p_end}">
            <c:choose>
                <c:when test="${i == curIndex}">
                    <td class="active"><a class="currentIndex " href="#">${i}</a></td>
                </c:when>
                <c:otherwise>
                    <td>
                        <%if (url == null) {%>
                        <a href="search?type=1&page=${i}">${i}</a>
                        <%} else {%>
                        <a href="<%=url%>?page=${i}">${i}</a>
                        <%}%>
                    </td>
                </c:otherwise>
            </c:choose>
        </c:forEach>

        <% if (curIndex != totalPage) {%>
        <td>
            <%if (url == null) {%>
            <a href="search?type=1&page=<%=curIndex+1%>">下一页</a>
            <%} else {%>
            <a href="<%=url%>?page=<%=curIndex+1%>">下一页</a>
            <%}%>
        </td>
        <td>
            <%if (url == null) {%>
            <a href="search?type=1&page=<%=totalPage%>">末页</a>
            <%} else {%>
            <a href="<%=url%>?page=<%=totalPage%>">末页</a>
            <%}%>
        </td>
        <%} else {%>
        <td class="disabled"><a href="#">下一页</a></td>
        <td class="disabled"><a href="#">末页</a></td>
        <%}%>
        <td>共${totalPage}页</td>
        <td class="input_li">跳转到:<input type="text" id="p_pageIndex" size="2" value="<c:out value="${currentPage}"/>"/>页
            <input type="button" id="gotoBtn" onclick="gotoPageByBtn()" value="GO"/></td>
    </tr>
</table>
<script><!--分页跳转脚本-->
function gotoPageByBtn() {
    var pageIndex = document.getElementById("p_pageIndex").value;
    var pageIndexInt = parseInt(pageIndex);
    var totalPage = ${totalPage};
    if (pageIndexInt > 0 && pageIndexInt <= totalPage) {
        <% if(url == null){%>
        window.location.href = "search?type=1&page=" + pageIndex;
        <%}else{%>
        window.location.href = "<%=url%>?page=" + pageIndex;
        <%}%>
    }
    else {
        alert("输入页数超出范围!");
    }
}
</script>