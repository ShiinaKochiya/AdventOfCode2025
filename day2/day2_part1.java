import java.io.*;
import java.util.*;

public class day2_part1 {
    public static void main(String[] args) {
        String FILE_PATH = "./day2/day2_input.txt";
        File file = new File(FILE_PATH);
        String line;
        try (BufferedReader br = new BufferedReader(new FileReader(file))) {
            line = br.readLine();
        } catch (java.lang.Exception e) {
            throw new RuntimeException(e);
        }

        //string to array
        String[] arr = line.split(",");
        System.out.println(arr[0]);
    }
}