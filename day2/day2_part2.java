import java.io.*;
import java.util.*;

public class day2_part2 {
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
                ArrayList<String> res = new ArrayList<>(); //saving results that have appeared to stop dupes

                for (int k = 1; k <= len / 2; k++){
                    String sec = n.substring(0,k);
                    String comp = "";
                    while (comp.length() < len){
                        comp = comp + sec;
                    }
                    comp = comp.substring(0,len);
                    if(n.equals(comp)){
                        if(!res.contains(comp)) {
                            total += j;
                            res.add(comp);
                        }
                    }
                }


            }
        }
        System.out.println(total);
    }
}