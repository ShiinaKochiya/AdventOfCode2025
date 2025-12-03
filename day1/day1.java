import java.io.*;
import java.util.*;

public class day1 {
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
                    System.out.println(line);
                    int oldPointer = pointer;
                    line = line.replaceAll("L", "");
                    pointer -= Integer.parseInt(line);
                    while (pointer < 0) {
                        pointer += 100;
                        System.out.println(pointer);
                        if (pointer != 0 && oldPointer != 0) {
                            pass++;
                            System.out.println("increase pass by 1, from " + oldPointer + " to " + pointer + "");
                        }

                    }
                    if (pointer == 0) {
                        pass++;
                        System.out.println("increase pass by 1");
                    }
                    System.out.println(pointer);
                } else {
                    //go forward
                    System.out.println(line);
                    int oldPointer = pointer;
                    line = line.replaceAll("R", "");
                    pointer += Integer.parseInt(line);
                    while (pointer > 99) {
                        pointer -= 100;
                        System.out.println(pointer);
                        if (pointer != 0 && oldPointer != 0) {
                            pass++;
                            System.out.println("increase pass by 1, from " + oldPointer + " to " + pointer + "");
                        }

                    }
                    if (pointer == 0) {
                        pass++;
                        System.out.println("increase pass by 1");
                    }
                    System.out.println(pointer);
                }
            }
        } catch (IOException e) {}
        System.out.println(pass);
    }
}