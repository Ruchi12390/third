import java.util.*;
class First{
    public static void main(String args[]){
        Scanner sc=new Scanner(System.in);
        int intialAttempt,NumAttempt,score,random;
        String play="yes";
        boolean win;
        score=0;
        System.out.println("Welcome to the Game");
        while(play.equalsIgnoreCase("yes")){
            System.out.println("Enter the guess: ");
            random=(int)(Math.random()*100);
            win=false;
            intialAttempt=0;
            NumAttempt=4;
            while(intialAttempt<NumAttempt){
                intialAttempt++;
                int a=sc.nextInt();
                sc.nextLine();
                if(random==a){
                    win=true;
                    System.out.println("Congratulations!You win");
                    break;
                }
                else if(a>random){
                    System.out.println("too high");
                }
                else{
                    System.out.println("too low");
                }
            } 
            if(win){
                score++;
            }
            System.out.println("Number is "+random);
            System.out.println("Do you want to play Again");
            play=sc.nextLine();
        }
        System.out.println("Your final score is "+score);
        sc.close();
    }
}