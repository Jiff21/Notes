class Scene(object):
    def enter(self):
        pass

class Engine(object):
    def __init__(self, scene_map):
        pass
    def play(self):
        pass

class Death(Scene):
    def enter(self):
        pass

class CentralCorridor(Scene):
    def enter(self):
        pass

class LaserWeaponArmory(Scene):
    def enter(self):
        pass

class TheBridge(Scene):
    def enter(self):
        pass

class EscapePod(Scene):
    def enter(self):
        pass

class Map(object):

    def __init__(self, start_scene):
        pass

    def next_scene(self, scene_name):
        pass

    def opening_scene(self):
        pass

class Character(object):

	def __init__(self, n):
		self.name = n
		self.hp = None
		self.weapon

	def attack():
		ap = self.roll * self.weapon

class Player(Character):

	def __init__(self):

class Enemy(Character):
	def __init__(self):
		self.roll


a_map = Map('central_corridor')
a_game = Engine(a_map)
a_game.play()