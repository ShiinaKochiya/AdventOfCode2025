import java.io.*;
import java.util.*;

public class day1_part2 {
    public static void main(String[] args) {
        String FILE_PATH = "./day1_input.txt";
        File file = new File(FILE_PATH);
        int pointer = 50;
        int pass = 0;
        try (BufferedReader br = new BufferedReader(new FileReader(file))) {
            String line;
            while ((line = br.readLine()) != null) {
                if(line.startsWith("L")){
                    //go back
                    line = line.replaceAll("L", "");
                    int loop = Integer.parseInt(line);
                    while(loop!=0){
                        pointer--;
                        loop--;
                        if (pointer == -1){pointer = 99;}
                        if (pointer == 0) {
                            pass++;
                        }
                    }
                } else {
                    //go forward
                    line = line.replaceAll("R", "");
                    int loop = Integer.parseInt(line);
                    while (loop != 0){
                        pointer++;
                        loop--;
                        if (pointer == 100){pointer = 0;}
                        if (pointer == 0) {
                            pass++;
                        }
                    }
                }
            }
        } catch (IOException e) {}
        System.out.println(pass);
    }
}