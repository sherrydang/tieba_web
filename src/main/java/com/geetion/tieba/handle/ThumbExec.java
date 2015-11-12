package com.geetion.tieba.handle;

import net.coobird.thumbnailator.Thumbnails;
import net.coobird.thumbnailator.Thumbnails.Builder;

import java.io.File;
import java.io.IOException;

/**
 * ����ͼ������
 *
 * @author rex
 */
public class ThumbExec {

	/**
	 * ����ͼƬ
	 *
	 * @param filePath
	 *            ԴͼƬλ��
	 * @param thumbPath
	 *            ���Ժ��λ��
	 * @param width
	 *            ���Կ�
	 * @param height
	 *            ���Ը�
	 * @param scale
	 *            ����������
	 * @param quality
	 *            ͼƬ�����ٷ���
	 * @param rotate
	 *            ��ת�Ƕ�
	 * @return
	 */
	public static String thumb(String filePath, String thumbPath, int width, int height, double scale, double quality, double rotate) {
		File img = new File(thumbPath);

		if (img.exists()) {
			return img.getPath();
		}
		Builder<File> f = Thumbnails.of(filePath);
		if (width > 0 && height > 0) {
			f.size(width, height);
		}
		if (scale > 0.0D) {
			f.scale(scale);
		}
		if (quality > 0.0D) {
			f.outputQuality(quality);
		}
		if (rotate > 0.0D) {
			f.rotate(rotate);
		}
		try {
			f.toFile(img);
			return img.getPath();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return filePath;
	}

	public static void main(String[] args) {
		String filePath = "D:\\tomca7\\webapps\\unique-img-plugin\\upload\\12674158787444.jpg";
		File img = new File("D:\\tomca7\\webapps\\unique-img-plugin\\upload\\12674158787444_1.jpg");
		Builder<File> f = Thumbnails.of(filePath);
		f.size(200, 200);
		// f = f.scale(1);
		// f = f.outputQuality(quality);
		if ("a".equals("a")) {
			f.rotate(180);
		}
		try {
			f.toFile(img);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
