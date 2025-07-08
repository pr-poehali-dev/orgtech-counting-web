import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import Icon from "@/components/ui/icon";

interface Employee {
  id: number;
  name: string;
  email: string;
  branch: number;
  equipment: string[];
}

interface Equipment {
  id: number;
  name: string;
  term: string;
  icon: string;
  available: number;
  total: number;
}

const Index = () => {
  const [selectedBranch, setSelectedBranch] = useState<number | null>(null);
  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: 1,
      name: "Иванов Иван",
      email: "ivanov@company.com",
      branch: 1,
      equipment: ["Ноутбук HP", "Телефон iPhone"],
    },
    {
      id: 2,
      name: "Петрова Мария",
      email: "petrova@company.com",
      branch: 1,
      equipment: ["Ноутбук Dell", "Монитор Samsung"],
    },
    {
      id: 3,
      name: "Сидоров Петр",
      email: "sidorov@company.com",
      branch: 2,
      equipment: ["Ноутбук Lenovo"],
    },
    {
      id: 4,
      name: "Козлова Анна",
      email: "kozlova@company.com",
      branch: 3,
      equipment: ["Ноутбук MacBook", "Телефон Samsung", "Монитор LG"],
    },
  ]);
  const [equipment, setEquipment] = useState<Equipment[]>([
    {
      id: 1,
      name: "Ноутбук HP",
      term: "6 лет",
      icon: "Laptop",
      available: 5,
      total: 15,
    },
    {
      id: 2,
      name: "Ноутбук Dell",
      term: "6 лет",
      icon: "Laptop",
      available: 3,
      total: 10,
    },
    {
      id: 3,
      name: "Телефон iPhone",
      term: "3 года",
      icon: "Smartphone",
      available: 8,
      total: 20,
    },
    {
      id: 4,
      name: "Телефон Samsung",
      term: "3 года",
      icon: "Smartphone",
      available: 12,
      total: 18,
    },
    {
      id: 5,
      name: "Монитор LG",
      term: "6 лет",
      icon: "Monitor",
      available: 7,
      total: 15,
    },
    {
      id: 6,
      name: "Принтер Canon",
      term: "5 лет",
      icon: "Printer",
      available: 2,
      total: 8,
    },
  ]);

  // Диалоги
  const [issueEquipmentOpen, setIssueEquipmentOpen] = useState(false);
  const [addEmployeeOpen, setAddEmployeeOpen] = useState(false);
  const [editEmployeeOpen, setEditEmployeeOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null,
  );

  // Форма выдачи техники
  const [issueForm, setIssueForm] = useState({
    employeeId: "",
    equipmentId: "",
    issueDate: "",
  });

  // Форма сотрудника
  const [employeeForm, setEmployeeForm] = useState({
    name: "",
    email: "",
    branch: "",
  });

  const branches = [
    { id: 1, name: "Филиал №1", employeeCount: 12, equipmentCount: 45 },
    { id: 2, name: "Филиал №2", employeeCount: 8, equipmentCount: 28 },
    { id: 3, name: "Филиал №3", employeeCount: 15, equipmentCount: 52 },
    { id: 4, name: "Филиал №4", employeeCount: 10, equipmentCount: 35 },
  ];

  const equipmentTypes = [
    { name: "Ноутбук", term: "6 лет", icon: "Laptop", count: 45 },
    { name: "Телефон", term: "3 года", icon: "Smartphone", count: 28 },
    { name: "Монитор", term: "6 лет", icon: "Monitor", count: 32 },
    { name: "Принтер", term: "5 лет", icon: "Printer", count: 12 },
  ];

  // Функции
  const handleIssueEquipment = () => {
    if (!issueForm.employeeId || !issueForm.equipmentId) {
      toast({
        title: "Ошибка",
        description: "Выберите сотрудника и технику",
        variant: "destructive",
      });
      return;
    }

    const employee = employees.find(
      (e) => e.id === parseInt(issueForm.employeeId),
    );
    const equipmentItem = equipment.find(
      (e) => e.id === parseInt(issueForm.equipmentId),
    );

    if (employee && equipmentItem) {
      // Обновляем сотрудника
      setEmployees((prev) =>
        prev.map((emp) =>
          emp.id === employee.id
            ? { ...emp, equipment: [...emp.equipment, equipmentItem.name] }
            : emp,
        ),
      );

      // Обновляем количество доступной техники
      setEquipment((prev) =>
        prev.map((eq) =>
          eq.id === equipmentItem.id
            ? { ...eq, available: eq.available - 1 }
            : eq,
        ),
      );

      toast({
        title: "Успешно",
        description: `Техника ${equipmentItem.name} выдана сотруднику ${employee.name}`,
      });
      setIssueEquipmentOpen(false);
      setIssueForm({ employeeId: "", equipmentId: "", issueDate: "" });
    }
  };

  const handleAddEmployee = () => {
    if (!employeeForm.name || !employeeForm.email || !employeeForm.branch) {
      toast({
        title: "Ошибка",
        description: "Заполните все поля",
        variant: "destructive",
      });
      return;
    }

    const newEmployee: Employee = {
      id: Math.max(...employees.map((e) => e.id)) + 1,
      name: employeeForm.name,
      email: employeeForm.email,
      branch: parseInt(employeeForm.branch),
      equipment: [],
    };

    setEmployees((prev) => [...prev, newEmployee]);
    toast({
      title: "Успешно",
      description: `Сотрудник ${newEmployee.name} добавлен`,
    });
    setAddEmployeeOpen(false);
    setEmployeeForm({ name: "", email: "", branch: "" });
  };

  const handleEditEmployee = () => {
    if (
      !selectedEmployee ||
      !employeeForm.name ||
      !employeeForm.email ||
      !employeeForm.branch
    ) {
      toast({
        title: "Ошибка",
        description: "Заполните все поля",
        variant: "destructive",
      });
      return;
    }

    setEmployees((prev) =>
      prev.map((emp) =>
        emp.id === selectedEmployee.id
          ? {
              ...emp,
              name: employeeForm.name,
              email: employeeForm.email,
              branch: parseInt(employeeForm.branch),
            }
          : emp,
      ),
    );

    toast({ title: "Успешно", description: `Данные сотрудника обновлены` });
    setEditEmployeeOpen(false);
    setSelectedEmployee(null);
    setEmployeeForm({ name: "", email: "", branch: "" });
  };

  const handleDeleteEmployee = (employeeId: number) => {
    setEmployees((prev) => prev.filter((emp) => emp.id !== employeeId));
    toast({ title: "Успешно", description: "Сотрудник удален" });
  };

  const openEditEmployee = (employee: Employee) => {
    setSelectedEmployee(employee);
    setEmployeeForm({
      name: employee.name,
      email: employee.email,
      branch: employee.branch.toString(),
    });
    setEditEmployeeOpen(true);
  };

  const filteredEmployees = selectedBranch
    ? employees.filter((emp) => emp.branch === selectedBranch)
    : employees;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Icon name="Building2" size={20} className="text-white" />
              </div>
              <h1 className="text-xl font-semibold text-slate-900">
                Учёт оргтехники
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Icon name="Settings" size={16} className="mr-2" />
                Настройки
              </Button>
              <Button variant="outline" size="sm">
                <Icon name="FileText" size={16} className="mr-2" />
                Отчёты
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Филиалы */}
        <div className="mb-8">
          <h2 className="text-lg font-medium text-slate-900 mb-4">Филиалы</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {branches.map((branch) => (
              <Card
                key={branch.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedBranch === branch.id
                    ? "ring-2 ring-blue-500 bg-blue-50"
                    : "hover:bg-slate-50"
                }`}
                onClick={() =>
                  setSelectedBranch(
                    selectedBranch === branch.id ? null : branch.id,
                  )
                }
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center justify-between">
                    {branch.name}
                    <Icon
                      name="Building"
                      size={16}
                      className="text-slate-500"
                    />
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">Сотрудники</span>
                      <Badge variant="secondary">{branch.employeeCount}</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">Техника</span>
                      <Badge variant="secondary">{branch.equipmentCount}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Сотрудники */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-slate-900">
                Сотрудники{" "}
                {selectedBranch &&
                  `(${branches.find((b) => b.id === selectedBranch)?.name})`}
              </h2>
              <Dialog open={addEmployeeOpen} onOpenChange={setAddEmployeeOpen}>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Icon name="Plus" size={16} className="mr-2" />
                    Добавить
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Добавить сотрудника</DialogTitle>
                    <DialogDescription>
                      Заполните информацию о новом сотруднике
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">ФИО</Label>
                      <Input
                        id="name"
                        value={employeeForm.name}
                        onChange={(e) =>
                          setEmployeeForm({
                            ...employeeForm,
                            name: e.target.value,
                          })
                        }
                        placeholder="Иванов Иван Иванович"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={employeeForm.email}
                        onChange={(e) =>
                          setEmployeeForm({
                            ...employeeForm,
                            email: e.target.value,
                          })
                        }
                        placeholder="ivanov@company.com"
                      />
                    </div>
                    <div>
                      <Label htmlFor="branch">Филиал</Label>
                      <Select
                        value={employeeForm.branch}
                        onValueChange={(value) =>
                          setEmployeeForm({ ...employeeForm, branch: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите филиал" />
                        </SelectTrigger>
                        <SelectContent>
                          {branches.map((branch) => (
                            <SelectItem
                              key={branch.id}
                              value={branch.id.toString()}
                            >
                              {branch.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="outline"
                        onClick={() => setAddEmployeeOpen(false)}
                      >
                        Отмена
                      </Button>
                      <Button onClick={handleAddEmployee}>Добавить</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <div className="space-y-4">
              {filteredEmployees.map((employee) => (
                <Card
                  key={employee.id}
                  className="hover:shadow-sm transition-shadow"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-base">
                          {employee.name}
                        </CardTitle>
                        <CardDescription className="flex items-center mt-1">
                          <Icon name="Mail" size={14} className="mr-1" />
                          {employee.email}
                        </CardDescription>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">
                          {branches.find((b) => b.id === employee.branch)?.name}
                        </Badge>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openEditEmployee(employee)}
                        >
                          <Icon name="Edit" size={14} />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteEmployee(employee.id)}
                        >
                          <Icon
                            name="Trash2"
                            size={14}
                            className="text-red-500"
                          />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-slate-700">
                        Выданная техника:
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {employee.equipment.length > 0 ? (
                          employee.equipment.map((item, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="text-xs"
                            >
                              {item}
                            </Badge>
                          ))
                        ) : (
                          <span className="text-sm text-slate-500">
                            Техника не выдана
                          </span>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Оборудование */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-slate-900">
                Оборудование
              </h2>
              <Button size="sm" variant="outline">
                <Icon name="Package" size={16} className="mr-2" />
                Склад
              </Button>
            </div>
            <div className="space-y-4">
              {equipment.map((equipmentItem) => (
                <Card key={equipmentItem.id} className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                      <Icon
                        name={equipmentItem.icon as any}
                        size={20}
                        className="text-slate-600"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-slate-900">
                        {equipmentItem.name}
                      </div>
                      <div className="text-sm text-slate-600">
                        Срок: {equipmentItem.term}
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="secondary">
                        {equipmentItem.available}/{equipmentItem.total}
                      </Badge>
                      <div className="text-xs text-slate-500 mt-1">
                        доступно
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <Separator className="my-6" />

            {/* Быстрые действия */}
            <div className="space-y-3">
              <h3 className="text-base font-medium text-slate-900">
                Быстрые действия
              </h3>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  size="sm"
                  onClick={() => setAddEmployeeOpen(true)}
                >
                  <Icon name="UserPlus" size={16} className="mr-2" />
                  Добавить сотрудника
                </Button>
                <Dialog
                  open={issueEquipmentOpen}
                  onOpenChange={setIssueEquipmentOpen}
                >
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      size="sm"
                    >
                      <Icon name="PackagePlus" size={16} className="mr-2" />
                      Выдать технику
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Выдача техники</DialogTitle>
                      <DialogDescription>
                        Выберите сотрудника и технику для выдачи
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="employee">Сотрудник</Label>
                        <Select
                          value={issueForm.employeeId}
                          onValueChange={(value) =>
                            setIssueForm({ ...issueForm, employeeId: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите сотрудника" />
                          </SelectTrigger>
                          <SelectContent>
                            {employees.map((employee) => (
                              <SelectItem
                                key={employee.id}
                                value={employee.id.toString()}
                              >
                                {employee.name} -{" "}
                                {
                                  branches.find((b) => b.id === employee.branch)
                                    ?.name
                                }
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="equipment">Техника</Label>
                        <Select
                          value={issueForm.equipmentId}
                          onValueChange={(value) =>
                            setIssueForm({ ...issueForm, equipmentId: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите технику" />
                          </SelectTrigger>
                          <SelectContent>
                            {equipment
                              .filter((eq) => eq.available > 0)
                              .map((equipmentItem) => (
                                <SelectItem
                                  key={equipmentItem.id}
                                  value={equipmentItem.id.toString()}
                                >
                                  {equipmentItem.name} (доступно:{" "}
                                  {equipmentItem.available})
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="issueDate">Дата выдачи</Label>
                        <Input
                          id="issueDate"
                          type="date"
                          value={issueForm.issueDate}
                          onChange={(e) =>
                            setIssueForm({
                              ...issueForm,
                              issueDate: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="outline"
                          onClick={() => setIssueEquipmentOpen(false)}
                        >
                          Отмена
                        </Button>
                        <Button onClick={handleIssueEquipment}>Выдать</Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  size="sm"
                >
                  <Icon name="BarChart3" size={16} className="mr-2" />
                  Отчёт по филиалам
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Диалог редактирования сотрудника */}
      <Dialog open={editEmployeeOpen} onOpenChange={setEditEmployeeOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Редактировать сотрудника</DialogTitle>
            <DialogDescription>
              Измените информацию о сотруднике
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="editName">ФИО</Label>
              <Input
                id="editName"
                value={employeeForm.name}
                onChange={(e) =>
                  setEmployeeForm({ ...employeeForm, name: e.target.value })
                }
                placeholder="Иванов Иван Иванович"
              />
            </div>
            <div>
              <Label htmlFor="editEmail">Email</Label>
              <Input
                id="editEmail"
                type="email"
                value={employeeForm.email}
                onChange={(e) =>
                  setEmployeeForm({ ...employeeForm, email: e.target.value })
                }
                placeholder="ivanov@company.com"
              />
            </div>
            <div>
              <Label htmlFor="editBranch">Филиал</Label>
              <Select
                value={employeeForm.branch}
                onValueChange={(value) =>
                  setEmployeeForm({ ...employeeForm, branch: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Выберите филиал" />
                </SelectTrigger>
                <SelectContent>
                  {branches.map((branch) => (
                    <SelectItem key={branch.id} value={branch.id.toString()}>
                      {branch.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setEditEmployeeOpen(false)}
              >
                Отмена
              </Button>
              <Button onClick={handleEditEmployee}>Сохранить</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
