package example;

import example.index.IndexCreate;

public class IndexLunchar {

    public static void main(String[] args) {
//      索引文件将要存放的位置
        String indexDir = "E:\\lucenetemp\\index";
//      数据源地址
        String dataDir = "E:\\lucenetemp\\data";
        IndexCreate ic = null;
        try {
            ic = new IndexCreate(indexDir);
            long start = System.currentTimeMillis();
            int num = ic.index(dataDir);
            long end = System.currentTimeMillis();
            System.out.println("索引指定路径下" + num + "个文件，一共花费了" + (end - start) + "毫秒");
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                ic.closeIndexWriter();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
}
