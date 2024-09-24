import net.sf.mpxj.ProjectFile;
import net.sf.mpxj.mpp.MPPReader;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.FileOutputStream;
import java.io.IOException;

public class MppToExcel {
    public static void main(String[] args) throws Exception {
        MPPReader reader = new MPPReader();
        ProjectFile project = reader.read(args[0]);  // Takes .MPP file path as argument
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Tasks");

        // Example: Export Tasks to Excel
        int rowNum = 0;
        for (Task task : project.getTasks()) {
            Row row = sheet.createRow(rowNum++);
            row.createCell(0).setCellValue(task.getName());
            row.createCell(1).setCellValue(task.getStart().toString());
            row.createCell(2).setCellValue(task.getFinish().toString());
            row.createCell(3).setCellValue(task.getDuration().toString());
        }

        try (FileOutputStream fos = new FileOutputStream(args[1])) {
            workbook.write(fos); // Write to output Excel file
        }
        workbook.close();
    }
}
