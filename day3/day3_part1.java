import java.io.*;
import java.util.*;

public class day1 {
    public static void main(String[] args) {
        String FILE_PATH = "./day3/day3_input.txt";
        File file = new File(FILE_PATH);

        try (BufferedReader br = new BufferedReader(new FileReader(file))) {
            String line;
            while ((line = br.readLine()) != null) {}

        } catch (IOException e) {}
    }
}