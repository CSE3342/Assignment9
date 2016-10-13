# Preston Tighe
# 10-12-16
# CSE 3342 - Programming Languages
# Assignment 9


class Observable:
    def __init__(self):
        self.obs = []

    def add_observer(self, observer):
        if observer not in self.obs:
            self.obs.append(observer)

    def remove_observer(self, observer):
        self.obs.remove(observer)

    def notify_observers(self):
        for observer in self.obs:
            try:
                observer.update(self)
            except AttributeError:
                print(observer.name + ' has no update method.')

    def delete_observers(self):
        self.obs = []


class Reporter:
    def __init__(self, name):
        self.name = name

    def update(self, arg):
        if isinstance(arg, Politician):
            print('From reporter ' + self.name + ': Politician ' + arg.name +
                  ' money is now at ' + str(arg.money) + '.')
        else:
            print('Not interested')


class Zombie:
    def __init__(self, name):
        self.name = name


class Politician(Observable):
    def __init__(self, name, money):
        super().__init__()
        self.name = name
        self.money = money

    def update(self, new_money):
        print('From politician ' + self.name + ': My money is now at ' + str(new_money))
        self.money = new_money
        self.notify_observers()


bob_reporter = Reporter('Bob')
sally_politician = Politician('Sally', 10)
zombie = Zombie('JoeTheZombie')

print('Test 1: Bob as a observer to the politician Sally, update politician money to 15,'
      ' remove the reporter as an observer of the politician')
sally_politician.add_observer(bob_reporter)
sally_politician.update(15)
sally_politician.remove_observer(bob_reporter)
print('')

print('Test 2: no observers, update politician money to 20')
sally_politician.update(20)
print('')

print('Test 3: Zombie as an observer to the politician, update politician money to 25')
sally_politician.add_observer(zombie)
sally_politician.update(25)
print('')

print('Test 4: Zombie as an observer to the politician, update politician money to 25')
sally_politician.add_observer(zombie)
sally_politician.update(25)

