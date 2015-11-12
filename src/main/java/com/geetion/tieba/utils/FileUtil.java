package com.geetion.tieba.utils;

import java.io.File;

public class FileUtil {

    /**
     * �ж��ļ��Ƿ����
     *
     * @param filePath
     * @return
     */
    public static boolean exists(String filePath) {
        return new File(filePath).exists();
    }

    /**
     * ��ȡ�ļ���׺
     *
     * @param fileName
     * @return
     */
    public static String getSuffix(String fileName) {
        return fileName.substring(fileName.lastIndexOf(".") + 1);
    }

    /**
     * ��ȡ�ļ���
     *
     * @param filePath
     * @return
     */
    public static String getFileName(String filePath) {
        return filePath.substring(filePath.lastIndexOf("/") + 1);
    }

    /**
     * ��ȡ�ļ������׺��ȫ·��
     *
     * @param filePath
     * @return
     */
    public static String getNoSuffixFilePath(String filePath) {
        return filePath.substring(0, filePath.lastIndexOf("."));
    }

    /**
     * ��ȡͼƬ����ͼ·��
     *
     * @param filePath
     * @param width
     * @param height
     * @param quality
     * @return
     */
    public static String getThumbPath(String filePath, int width, int height, int quality) {
        String kzm = null;
        if (quality > 0) {
            kzm = FileUtil.getNoSuffixFilePath(filePath) + "_" + width + "x" + height + "_" + quality + "." + FileUtil.getSuffix(filePath);
        } else {
            kzm = FileUtil.getNoSuffixFilePath(filePath) + "_" + width + "x" + height + "." + FileUtil.getSuffix(filePath);
        }
        return kzm;
    }

    /**
     * ��ȡ����ͼ·��
     *
     * @param filePath
     * @param scale
     * @param quality
     * @return
     */
    public static String getThumbScalePath(String filePath, float scale, int quality) {
        String kzm = null;
        if (quality > 0) {
            kzm = FileUtil.getNoSuffixFilePath(filePath) + "_" + BigDecimalUtil.decimal2percent(scale, 0) + "_" + quality + "."
                    + FileUtil.getSuffix(filePath);
        } else {
            kzm = FileUtil.getNoSuffixFilePath(filePath) + "_" + BigDecimalUtil.decimal2percent(scale, 0) + "." + FileUtil.getSuffix(filePath);
        }
        return kzm;
    }

    /**
     * ��ȡͼƬ�������
     * 
     * @param filePath
     * @param scale
     * @param width
     * @param height
     * @param quality
     * @param rotate
     * @return
     */
    public static String getImgPath(String filePath, Integer width, Integer height, Double quality, Double scale,  Double rotate) {
        // abc_300x500_s_xx_q90_r90.png
        String k = getNoSuffixFilePath(filePath);
        StringBuffer sb = new StringBuffer(k);
        if (null != width && null != height && width != 0 && height != 0) {
            sb.append("_" + width + "x" + height);
        }
        if (null != scale && scale.compareTo(0.0D) > 0) {
            sb.append("_" + scale);
        }
        if (null != quality && quality > 0) {
            sb.append("_q" + quality);
        }
        if (null != rotate && rotate.compareTo(0.0D) > 0) {
            sb.append("_r" + rotate);
        }
        return sb.append("." + getSuffix(filePath)).toString();
    }

}
