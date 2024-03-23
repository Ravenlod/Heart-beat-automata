import copy
import numpy as np

class CellAutomata:
    

    def __init__(self, input_data : dict):
        self.dimension = 2
        self.dimension_size = input_data['size']
        self.logic_type = input_data['logic_type']
        
        if self.logic_type == 1:
            self.number_of_teams = input_data['teams']
            self.number_of_conditions = input_data['conditions']
            self.initial_setup = input_data['setup']
            self.matrix = np.zeros((self.dimension_size, self.dimension_size))


    def NextStep(self, add_pos : dict):
        pass

class Neuron:
    id_counter=0
    refrak = 3
    neuron_network = []
    input_data = {}
    isBegin=True
    def __init__(self, value, *neighbour):
        self.value = value
        self.neighbour = neighbour
        self.isChange = False
        self.id=Neuron.id_counter
        Neuron.id_counter+=1

    @staticmethod
    def changes_value(neurons, copy=None):
        last_neurons = copy
        for index, neuron in enumerate(neurons):
            #print(neurons[index].value, ' --- ',index)
            if(last_neurons[index].value<neuron.value):
                neurons[index].value='*'#Neuron.refrak
                #print('modify', neurons[index].value, ' --- ',index)

        for index, neuron in enumerate(neurons):
            if neuron.value == '*' and not neuron.isChange:
                neuron.value=Neuron.refrak-1
                neuron.isChange = True
                for ids_neurons in neuron.neighbour:
                    if(neurons[int(ids_neurons)-1].value==0):
                        neurons[int(ids_neurons)-1].value='*'
                        neurons[int(ids_neurons)-1].isChange=True
        for index, neuron in enumerate(neurons):
            if neuron.value != 0 and neuron.value!='*' and not neuron.isChange:
                neuron.value-=1
            
        for neuron in neurons:
            neuron.isChange = False
        return neurons

    @staticmethod
    def next():
        Neuron.changes_value(Neuron.neuron_network)
        


input_data = {

}

#{'links': [['4', '5'], ['5', '1'], ['2', '5'], ['3', '2']]}
def Heart(input):

    if isinstance(input, dict):
        if int(input['treshold']) > 0:
            Neuron.refrak=int(input['treshold'])
        elif int(input['treshold']) <= 0:
            Neuron.refrak=3
        for node in input['links']:
            for id in node:
                if str(int(id)-1) in Neuron.input_data:
                    Neuron.input_data[str(int(id)-1)]['neighbours'].append(*[id_neighbours for id_neighbours in node if id_neighbours!=id])
                else:
                    Neuron.input_data[str(int(id)-1)] = {
                                'value':0,
                                'neighbours': [id_neighbours for id_neighbours in node if id_neighbours!=id]
                                }
        for node in input['links']:
            for id in node:
                Neuron.input_data[str(int(id)-1)]['neighbours']=list(set(Neuron.input_data[str(int(id)-1)]['neighbours']))
        count_neuron = len(Neuron.input_data)
        for i in range(count_neuron):
            isEnd = False
            neighbours = []
            neuron_value = int(Neuron.input_data[str(i)]['value'])
            Neuron.neuron_network.append(Neuron(neuron_value, *Neuron.input_data[str(i)]['neighbours']))
    else:#[['1', '0'], ['2', '0'], ['3', '0'], ['4', '0'], ['5', '0']]
        copy_neuron_network = []
        if Neuron.isBegin:
            Neuron.isBegin = False
        else:
            for neuron in Neuron.neuron_network:
                copy_neuron_network.append(copy.deepcopy(neuron))
            # copy_neuron_network=Neuron.neuron_network.deepcopy()
        for neuron_data in input:
            if neuron_data[1]!='*':
                Neuron.neuron_network[int(neuron_data[0])-1].value = int(neuron_data[1])
            else:
                Neuron.neuron_network[int(neuron_data[0])-1].value = '*'
        
        if len(copy_neuron_network)==0:
            for neuron in Neuron.neuron_network:
                copy_neuron_network.append(copy.deepcopy(neuron))
        Neuron.neuron_network=Neuron.changes_value(Neuron.neuron_network, copy_neuron_network)
        return [str(value.value) for value in Neuron.neuron_network]

