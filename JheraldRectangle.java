import java.util.Scanner;

public class JheraldRectangle {
public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int[] numbers = new int[5];
        int sum = 0;

        System.out.println("Please enter 5 numbers:");

        for (int i = 0; i < 5; i++) {
            System.out.print("Enter number " + (i + 1) + ": ");
            numbers[i] = scanner.nextInt();
            sum += numbers[i];
        }

        scanner.close();

        double average = (double) sum / 5;

        System.out.println("The numbers you entered are:");
        for (int number : numbers) {
            System.out.print(number + " ");
        }
        System.out.println();
        
        System.out.println("Sum: " + sum);
        System.out.println("Average: " + average);
    }
}
