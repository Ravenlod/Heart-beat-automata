class Neuron:
    id_counter=0
    refrak = 3
    def __init__(self, value, *neighbour):
        self.value = value
        self.neighbour = neighbour
        self.id=Neuron.id_counter
        Neuron.id_counter+=1
    def changes_value(self, neurons):
        for neuron in neurons:
            if neuron.value == self.refrak:
                if neuron.value != 0:
                    neuron.value-=1
                for ids_neurons in neuron.neighbour:
                    if(neurons[ids_neurons].value==0):
                        neurons[ids_neurons].value=self.refrak
    def next(self):
        Neuron.changes_value(neuron_network)
        for (index, neuron) in enumerate(neuron_network):
            print(neuron.id, ' - ', neuron.value, ' - ', neuron.neighbour)

neuron_network = []
input_data = {
    0: {
        'value':0 ,
        'neighbours': [1]
    },
    1: {
        'value':0 ,
        'neighbours': [0,2]
    },
    2: {
        'value':0 ,
        'neighbours': [1,3]
    },
    3: {
        'value':3,
        'neighbours': [1,2]
    }
}

count_neuron = len(input_data)
for i in range(count_neuron):
    isEnd = False
    neighbours = []
    neuron_value = input_data[i]['value']
    neuron_network.append(Neuron(neuron_value, *input_data[i]['neighbours']))

for (index, neuron) in enumerate(neuron_network):
    print(neuron.id, ' - ', neuron.value, ' - ', neuron.neighbour)

Neuron.next()

