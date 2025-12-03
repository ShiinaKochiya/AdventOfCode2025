import java.io.*;
import java.util.*;

public class day3_part2 {
    public static void main(String[] args) {
        String FILE_PATH = "./day3/day3_input.txt";
        File file = new File(FILE_PATH);
        long totalVoltage = 0;
        try (BufferedReader br = new BufferedReader(new FileReader(file))) {
            String line;
            while ((line = br.readLine()) != null) {
                int count = 12;
                int n = line.length();
                int toRemove = n - count;

                ArrayList<Character> list = new ArrayList<>();

                for (int i = 0; i < n; i++) {
                    char c = line.charAt(i);
                    while (!list.isEmpty() &&
                            list.get(list.size() - 1) < c &&
                            toRemove > 0) {

                        list.remove(list.size() - 1);
                        toRemove--;
                    }
                    list.add(c);
                }
                while (list.size() > count) {
                    list.remove(list.size() - 1);
                }

                String result = "";
                for (int i = 0; i < list.size(); i++) {
                    result += list.get(i);
                }

                System.out.println(result);

                totalVoltage += Long.parseLong(result);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        System.out.println(totalVoltage);
    }
}