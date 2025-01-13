from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
from fastapi.openapi.docs import get_swagger_ui_html
import uvicorn

quantum_app = FastAPI(
    title="Quantum Computational Interface",
    description="Hyperdimensional Microservice Topology"
)

@quantum_app.get("/", response_class=JSONResponse)
async def quantum_root_endpoint():
    return {
        "quantum_system_status": "Operational",
        "dimensional_coherence": 0.9999,
        "endpoint_vector": [
            "/quantum-compute",
            "/quantum-state",
            "/docs"
        ]
    }

@quantum_app.get("/docs", include_in_schema=False)
async def custom_swagger_ui_html():
    return get_swagger_ui_html(
        openapi_url="/openapi.json", 
        title="Quantum Computational Interface"
    )

if __name__ == "__main__":
    uvicorn.run(
        "enhanced_quantum_interface:quantum_app", 
        host="0.0.0.0", 
        port=8000, 
        reload=True
    )
