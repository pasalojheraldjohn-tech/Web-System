import java.util.*;
import java.util.stream.*;

public class JheraldProductStream  {
    static class Product {
        String name;
        double price;

        Product(String name, double price) {
            this.name = name;
            this.price = price;
        }
    }

    public static void main(String[] args) {
        List<Product> products = new ArrayList<>();
        products.add(new Product("Laptop", 850.00));
        products.add(new Product("Mouse", 25.50));
        products.add(new Product("Keyboard", 45.00));
        products.add(new Product("Monitor", 150.00));
        products.add(new Product("USB Drive", 15.75));

        Scanner scanner = new Scanner(System.in);
        System.out.print("Enter minimum price: ");
        double minPrice = scanner.nextDouble();

        long count = products.stream()
                .filter(p -> p.price > minPrice)
                .count();

        System.out.println("Number of products with price greater than " + minPrice + ": " + count);
    }
}