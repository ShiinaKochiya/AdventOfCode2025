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

        int length = arr.length;
        long total = 0;
        for (int i = 0; i < length; i++) {
            String[] parts = arr[i].split("-");
            //spliting the strings, then go from parts[0] to parts[1]
            for(long j = Long.parseLong(parts[0]); j <= Long.parseLong(parts[1]); j++){
                String n = "" + j;
                int len = n.length();
                String half1 = n.substring(0, len / 2);
                String half2 = n.substring(len / 2);
                if (half1.equals(half2)) {
                    total += j;
                }
            }
        }
        System.out.println(total);
    }
}