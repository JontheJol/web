import React, { useMemo } from 'react';
import {
  MaterialReactTable,
  type MRT_ColumnDef,
  MRT_ActionMenuItem,
} from 'material-react-table';
import { Box, Button } from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import { useAppStore, type User } from '../store/appStore';
import { useNavigate } from 'react-router-dom';

const UsersTable: React.FC = () => {
  const { users, removeUser } = useAppStore();
  const navigate = useNavigate();

  const columns = useMemo<MRT_ColumnDef<User>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        size: 80,
      },
      {
        accessorKey: 'name',
        header: 'Nombre',
        size: 200,
      },
      {
        accessorKey: 'email',
        header: 'Email',
        size: 250,
      },
      {
        accessorKey: 'age',
        header: 'Edad',
        size: 100,
      },
    ],
    []
  );

  const handleDeleteUser = (id: number) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      removeUser(id);
    }
  };

  return (
    <Box sx={{ padding: { xs: 1, sm: 2 } }}>
      <MaterialReactTable
        columns={columns}
        data={users}
        enableRowActions
        renderRowActionMenuItems={({ row, table }) => [
          <MRT_ActionMenuItem
            icon={<Edit />}
            key="edit"
            label="Editar"
            onClick={() => navigate(`/edit-user/${row.original.id}`)}
            table={table}
          />,
          <MRT_ActionMenuItem
            icon={<Delete />}
            key="delete"
            label="Eliminar"
            onClick={() => handleDeleteUser(row.original.id)}
            table={table}
          />,
        ]}
        renderTopToolbarCustomActions={() => (
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => navigate('/add-user')}
          >
            Agregar Usuario
          </Button>
        )}
        muiTableProps={{
          sx: {
            tableLayout: 'fixed',
          },
        }}
      />
    </Box>
  );
};

export default UsersTable;
