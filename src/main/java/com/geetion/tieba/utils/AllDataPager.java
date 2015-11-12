package com.geetion.tieba.utils;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by virgilyan on 1/16/15.
 */
public class AllDataPager {
    private String PageUrl;
    private boolean hasNext;
    private boolean hasPrevious;
    private String previousPage;
    private String nextPage;
    //第几页
    private int offset;
    //总个数
    private int size;
    //每页数据记录数
    private int length;
    //总页数
    private int pagenumber;

    public AllDataPager(int offset, int length, int size, String url) {
        this.offset = offset;
        this.length = length;
        this.size = size;
        int index = url.indexOf("&pager.offset");
        if (index > -1) {
            this.PageUrl = url.substring(0, index);
        } else {
            this.PageUrl = url;
        }
    }

    public void setoffset(int offset) {
        this.offset = offset;
    }

    public void setPagerUrl(String PagerUrl) {
        this.PageUrl = PagerUrl;
    }

    public void setsize(int size) {
        this.size = size;
    }

    public void setlength(int length) {
        this.length = length;
    }

    public int getoffset() {
        return this.offset;
    }

    public String getPageUrl() {
        return this.PageUrl;
    }

    public boolean gethasNext() {
        if ((offset + 1) * length >= size) {
            hasNext = false;
        } else {
            hasNext = true;
        }
        return hasNext;
    }

    public boolean gethasPrevious() {
        if (offset >= 1) {
            this.hasPrevious = true;
        } else {
            this.hasPrevious = false;
        }
        return hasPrevious;
    }

    public String getpreviousPage() {
        this.previousPage = "";
        if (this.gethasPrevious()) {
            this.previousPage = this.PageUrl + "&pager.offset=" + (offset - 1);
        }
        return previousPage;
    }

    public String getnextPage() {
        this.nextPage = "";
        if (this.gethasNext()) {
            this.nextPage = this.PageUrl + "&pager.offset=" + (offset + 1);
        }
        return this.nextPage;
    }

    public int getpagenumber() {
        float temppn = (float) size / (float) length;
        pagenumber = new Float(temppn).intValue();
        if (temppn > pagenumber) {
            this.pagenumber++;
        }
        return this.pagenumber;
    }

    public static ArrayList FindPageList(int offset, int length, List list) {
        ArrayList alist = new ArrayList();
        for (int i = offset * length; i < (offset * length + length) && i < list.size(); i++) {
            alist.add(list.get(i));
        }
        return alist;
    }
}
