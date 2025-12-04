import java.io.*;
import java.util.*;

public class day4_part1 {
    public static void main(String[] args) {
        String FILE_PATH = "./day4/day4_input.txt";
        File file = new File(FILE_PATH);

        List<List<String>> map = new ArrayList<List<String>>();

        List<String> x = new ArrayList<String>();

        x.add("Hello");
        x.add("world!");
        map.add(x);
        //always append a string arraylist to the map, not a string

        try (BufferedReader br = new BufferedReader(new FileReader(file))) {
            String line;
            while ((line = br.readLine()) != null) {

            }
        } catch (IOException e) {}
    }
}