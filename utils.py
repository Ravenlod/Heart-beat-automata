class Neuron:
    id_counter=0
    refrak = 3
    neuron_network = []
    input_data = {}
    def __init__(self, value, *neighbour):
        self.value = value
        self.neighbour = neighbour
        self.isChange = False
        self.id=Neuron.id_counter
        Neuron.id_counter+=1

    @staticmethod
    def changes_value(neurons):
        
        for neuron in neurons:
            if neuron.value == Neuron.refrak and not neuron.isChange:
                neuron.value-=1
                neuron.isChange = True
                for ids_neurons in neuron.neighbour:
                    if(neurons[int(ids_neurons)-1].value==0):
                        neurons[int(ids_neurons)-1].value=Neuron.refrak
                        neurons[int(ids_neurons)-1].isChange=True
            else:
                if neuron.value != 0 and neuron.value!=Neuron.refrak and not neuron.isChange:
                    neuron.value-=1
            
        for neuron in neurons:
            neuron.isChange = False
        return neurons

    @staticmethod
    def next():
        Neuron.changes_value(Neuron.neuron_network)
        for (index, neuron) in enumerate(Neuron.neuron_network):
            print(neuron.id, ' - ', neuron.value, ' - ', neuron.neighbour)


input_data = {
    # 0: {
    #     'value':0 ,
    #     'neighbours': [1,2]
    # },
    # 1: {
    #     'value':3 ,
    #     'neighbours': [0,2]
    # },
    # 2: {
    #     'value':0 ,
    #     'neighbours': [0,1,3,4]
    # },
    # 3: {
    #     'value':0,
    #     'neighbours': [2]
    # },
    # 4: {
    #     'value':0,
    #     'neighbours': [2]
    # },
}


# def createNeuron():
#     count_neuron = len(input_data)
#     for i in range(count_neuron):
#         isEnd = False
#         neighbours = []
#         neuron_value = input_data[str(i)]['value']
#         neuron_network.append(Neuron(neuron_value, *input_data[str(i)]['neighbours']))

#     for (index, neuron) in enumerate(neuron_network):
#         print(neuron.id, ' - ', neuron.value, ' - ', neuron.neighbour)


# Neuron.next()
# Neuron.next()
# Neuron.next()
# Neuron.next()
# Neuron.next()


#{'links': [['4', '5'], ['5', '1'], ['2', '5'], ['3', '2']]}
def Heart(input):
    if isinstance(input, dict):
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
        for neuron_data in input:
            # print(Neuron.neuron_network[int(neuron_data[0])-1])
            Neuron.neuron_network[int(neuron_data[0])-1].value = int(neuron_data[1])
            # print(Neuron.neuron_network[int(neuron_data[0])-1].value)
        for (index, neuron) in enumerate(Neuron.neuron_network):
            print(neuron.id, ' - ', neuron.value, ' - ', neuron.neighbour)
        Neuron.neuron_network=Neuron.changes_value(Neuron.neuron_network)
        return [str(value.value) for value in Neuron.neuron_network]

Heart({'links': [['1', '3'], ['1', '2'], ['2', '3'], ['3', '4'], ['3','5']]})
# for (index, neuron) in enumerate(neuron_network):
#         print(neuron.id, ' - ', neuron.value, ' - ', neuron.neighbour)
print(Heart([['1', '0'], ['2', '3'], ['3', '0'], ['4', '0'], ['5', '0']]))
for (index, neuron) in enumerate(Neuron.neuron_network):
        print(neuron.id, ' - ', neuron.value, ' - ', neuron.neighbour)
