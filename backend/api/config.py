from configparser import ConfigParser

config = ConfigParser()
config.read('config.ini', encoding='utf-8')

STRINGDB = config.get('config', 'stringdb')
