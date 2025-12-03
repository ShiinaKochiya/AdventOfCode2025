import java.io.*;
import java.util.*;

public class day1 {
    public static void main(String[] args) {
        String FILE_PATH = "./day3/day3_input.txt";
        File file = new File(FILE_PATH);
        int totalVoltage = 0;
        try (BufferedReader br = new BufferedReader(new FileReader(file))) {
            String line;
            while ((line = br.readLine()) != null) {
                int max = 0;
                for(int i = 0; i < line.length() - 1; i++){
                    for(int j = i + 1; j < line.length(); j++){
                        String num = line.charAt(i) + "" + line.charAt(j);
                        int voltage = Integer.parseInt(num);
                        if (max<voltage) {max = voltage;}
                    }
                }
                totalVoltage += max;
                System.out.println(max);
            }
        } catch (IOException e) {}
        System.out.println(totalVoltage);
    }
}