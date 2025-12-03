public class day2_part1 {
    public static void main(String[] args) {
        String FILE_PATH = "./day2_input.txt";
        File file = new File(FILE_PATH);
        try (BufferedReader br = new BufferedReader(new FileReader(file))) {
            String line;
            while ((line = br.readLine()) != null) {

            }
        } catch (java.lang.Exception e) {
            throw new RuntimeException(e);
        }
    }
}