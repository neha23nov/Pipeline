
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Any

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Pipeline(BaseModel):
    nodes: List[Any]
    edges: List[Any]

def check_is_dag(nodes: list, edges: list) -> bool:
    from collections import defaultdict, deque

    node_ids = set()
    for n in nodes:
        node_ids.add(n["id"] if isinstance(n, dict) else n.id)

    graph = defaultdict(list)
    in_degree = {nid: 0 for nid in node_ids}

    for edge in edges:
        src = edge["source"] if isinstance(edge, dict) else edge.source
        tgt = edge["target"] if isinstance(edge, dict) else edge.target
        graph[src].append(tgt)
        in_degree[tgt] += 1

    queue = deque([nid for nid in node_ids if in_degree[nid] == 0])
    visited = 0

    while queue:
        current = queue.popleft()
        visited += 1
        for neighbor in graph[current]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)

    return visited == len(node_ids)

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: Pipeline):
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)
    is_dag    = check_is_dag(pipeline.nodes, pipeline.edges)

    return {
        'num_nodes': num_nodes,
        'num_edges': num_edges,
        'is_dag':    is_dag,
    }