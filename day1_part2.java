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
                    int oldPointer = pointer;
                    line = line.replaceAll("L", "");
                    pointer -= Integer.parseInt(line);
                    while (pointer < 0) {
                        pointer += 100;
                        if(pointer != 0)pass++;
                    }
                    if (pointer == 0) {
                        pass++;
                    }
                } else {
                    //go forward
                    line = line.replaceAll("R", "");
                    pointer += Integer.parseInt(line);
                    while (pointer > 99) {
                        pointer -= 100;
                        if(pointer != 0)pass++;
                    }
                    if (pointer == 0) {
                        pass++;
                    }
                }
            }
        } catch (IOException e) {}
        System.out.println(pass);
    }
}