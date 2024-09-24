package com.mpp.converter;

import net.sf.mpxj.ProjectFile;
import net.sf.mpxj.Task;
import net.sf.mpxj.mpp.MPPReader;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.FileOutputStream;
import java.io.IOException;

public class MppToExcel {
    public static void main(String[] args) throws Exception {
        if (args.length < 2) {
            System.out.println("Usage: java -jar mpp-to-excel.jar <input_mpp_file> <output_excel_file>");
            return;
        }

        String mppFilePath = args[0];
        String excelFilePath = args[1];

        // Read the MPP file
        MPPReader reader = new MPPReader();
        ProjectFile project = reader.read(mppFilePath);

        // Create an Excel workbook and sheet
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Tasks");

        // Write task data to Excel
        int rowNum = 0;
        Row header = sheet.createRow(rowNum++);
        header.createCell(0).setCellValue("Task Name");
        header.createCell(1).setCellValue("Start Date");
        header.createCell(2).setCellValue("Finish Date");
        header.createCell(3).setCellValue("Duration");

        for (Task task : project.getTasks()) {
            Row row = sheet.createRow(rowNum++);
            row.createCell(0).setCellValue(task.getName());
            row.createCell(1).setCellValue(task.getStart().toString());
            row.createCell(2).setCellValue(task.getFinish().toString());
            row.createCell(3).setCellValue(task.getDuration().toString());
        }

        // Write Excel to file
        try (FileOutputStream fos = new FileOutputStream(excelFilePath)) {
            workbook.write(fos);
        } catch (IOException e) {
            e.printStackTrace();
        }

        workbook.close();
        System.out.println("MPP file converted to Excel successfully.");
    }
}
